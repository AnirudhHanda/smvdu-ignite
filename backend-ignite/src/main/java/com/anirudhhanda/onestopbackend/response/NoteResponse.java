package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Note;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponse {
    private boolean success;
    private Note note;
}
