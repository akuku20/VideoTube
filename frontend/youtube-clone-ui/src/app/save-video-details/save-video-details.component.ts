import {Component, inject} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";
import {VideoPlayerComponent} from "../video-player/video-player.component";
import {VideoDto} from "../../video-dto";

@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [
    FlexModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    NgIf,
    VideoPlayerComponent
  ],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})

export class SaveVideoDetailsComponent {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;

  announcer = inject(LiveAnnouncer);
  private thumbnailUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      tags: this.videoStatus
    });
  }
  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${value}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected($event: Event) {
    this.selectedFile = ($event.target as HTMLInputElement).files![0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        console.log(data);
        this.matSnackBar.open('Video uploaded successfully', 'Ok', {
          duration: 5000
        });
      })
  }

  saveVideo() {
    const videoMetadata: VideoDto = {
      'id': this.videoId,
      'title': this.saveVideoDetailsForm.get('title')?.value,
      'description': this.saveVideoDetailsForm.get('description')?.value,
      'tags': this.tags,
      'videoStatus': this.saveVideoDetailsForm.get('videoStatus')?.value,
      'videoUrl': this.videoUrl,
      'thumbnailUrl': this.thumbnailUrl
    }
    this.videoService.saveVideo(videoMetadata).subscribe(data => {
      console.log(data);
      this.matSnackBar.open('Video metadata saved successfully', 'Ok', {
        duration: 5000
      });
    })
  }
}
