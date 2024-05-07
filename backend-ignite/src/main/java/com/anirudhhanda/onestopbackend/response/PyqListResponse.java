package com.anirudhhanda.onestopbackend.response;

import com.anirudhhanda.onestopbackend.modal.Pyq;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PyqListResponse {
    private boolean success;
    private List<Pyq> pyqs;
}
