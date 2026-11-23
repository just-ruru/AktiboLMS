package com.aktibolms.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * Simple in-memory rate limiter using fixed window algorithm.
 * Limits: 10 requests per minute per IP for auth endpoints.
 */
@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS = 10;
    private static final long WINDOW_MS = TimeUnit.MINUTES.toMillis(1);

    // Map of key -> (windowStart, count)
    private final Map<String, WindowCounter> counters = new ConcurrentHashMap<>();

    private record WindowCounter(long windowStart, int count) {}

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // Only apply to auth endpoints
        String path = request.getRequestURI();
        if (!path.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = getClientIp(request);
        String key = clientIp + ":" + path;

        long now = System.currentTimeMillis();
        long windowStart = now - (now % WINDOW_MS);

        counters.compute(key, (k, counter) -> {
            if (counter == null || counter.windowStart() != windowStart) {
                return new WindowCounter(windowStart, 1);
            }
            return new WindowCounter(counter.windowStart(), counter.count() + 1);
        });

        WindowCounter counter = counters.get(key);
        if (counter.count() > MAX_REQUESTS) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("""
                    {
                      "timestamp": "%s",
                      "status": 429,
                      "error": "Too Many Requests",
                      "message": "Rate limit exceeded. Please try again later.",
                      "path": "%s"
                    }
                    """.formatted(Instant.now(), path));
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }
}