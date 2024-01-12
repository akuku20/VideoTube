package com.akuku.youtubeclone.service;

import io.awspring.cloud.s3.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectAclRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;


import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService {

    public static final String BUCKET_NAME = "akuku-yt";
    private final S3Client S3Client;

    @Override
    public String uploadFile(MultipartFile file) {

        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        var key = UUID.randomUUID() + "." + filenameExtension;
        var metadata = ObjectMetadata.builder()
                .contentType(file.getContentType())
                .build();

        try {
            S3Client.putObject(PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(key)
                    .metadata(metadata.getMetadata())
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error uploading file");
        }

        S3Client.putObjectAcl(PutObjectAclRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build());


        return S3Client.utilities().getUrl(builder -> builder.bucket(BUCKET_NAME).key(key)).toString();
    }
}