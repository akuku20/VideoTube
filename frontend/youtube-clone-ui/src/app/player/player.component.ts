import {Component, Input} from '@angular/core';
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";

@Component({
  selector: 'app-player',
  standalone: true,
    imports: [
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

    @Input() videoUrl!: string;

    constructor() {
        // Configure the input property
        this.videoUrl = new Input();
    }

    ngOnInit(): void {
    }
}
