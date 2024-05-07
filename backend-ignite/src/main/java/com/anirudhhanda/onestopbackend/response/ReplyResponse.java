package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Reply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyResponse {
    private boolean success;
    private Reply reply;
}
