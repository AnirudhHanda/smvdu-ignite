package com.anirudhhanda.onestopbackend.service;

import com.anirudhhanda.onestopbackend.modal.Reply;

import java.util.List;

public interface ReplyService {

    Reply createReply(Long questionId, Long userId, String reply) throws Exception;

    void deleteReply(Long replyId, Long userId) throws Exception;

    List<Reply> findRepliesByQuestionId(Long questionId) throws Exception;

}
