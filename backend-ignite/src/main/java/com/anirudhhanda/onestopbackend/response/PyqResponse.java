package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Pyq;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PyqResponse {
    private boolean success;
    private Pyq pyq;
}
