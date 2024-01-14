import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {PlayerComponent} from "../player/player.component";
import {FlexModule} from "@angular/flex-layout";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [
    PlayerComponent,
    FlexModule,
    NgIf
  ],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.css'
})
export class VideoDetailsComponent {

  videoId! : string;
  videoUrl!: string;
  videoAvailable = false;
  videoTitle!: string;
  videoDescription!: string;
  videoTags!: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private videoService: VideoService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoAvailable = true;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.videoTags = data.tags;
    })
  }

  ngOnInit(): void {
  }

}
