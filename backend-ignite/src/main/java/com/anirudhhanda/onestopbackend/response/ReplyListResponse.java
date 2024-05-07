package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Reply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyListResponse {
    private boolean success;
    private List<Reply> replies;
}
