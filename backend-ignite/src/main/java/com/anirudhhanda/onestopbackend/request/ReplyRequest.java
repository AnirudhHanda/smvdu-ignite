package com.anirudhhanda.onestopbackend.request;

import lombok.Data;

@Data
public class ReplyRequest {
    private String name;
    private Long questionId;
}
