package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Note;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteListResponse {
    private boolean success;
    private List<Note> notes;
}
