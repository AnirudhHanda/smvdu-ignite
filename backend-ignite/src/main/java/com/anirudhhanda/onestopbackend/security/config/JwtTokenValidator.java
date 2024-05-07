package com.anirudhhanda.onestopbackend.security.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

import io.jsonwebtoken.security.Keys;
import org.springframework.web.servlet.HandlerExceptionResolver;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        System.out.println("jwtTokenValidator called");
        
        System.out.println("Request URI: " + request.getRequestURI());
        // Skip JWT token validation for confirmation endpoint
        // Skip JWT token validation for confirmation endpoint
        if (request.getRequestURI().equals("/api/v1/confirm")) {
            filterChain.doFilter(request, response);
            return;
        }
            String jwt = request.getHeader(JwtConstant.JWT_Header);

            // bearer jwt
            if (jwt != null) {
                jwt = jwt.substring(7);
                try {
                    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                    String email = String.valueOf(claims.get("email"));
                    String authorities = String.valueOf(claims.get("authorities"));

                    List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (Exception e) {
                    throw new SignatureException("invalid token...");
                }
            }

            filterChain.doFilter(request, response);
    }
}
