

// songs-list.component.ts //////////////////////
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
   selector: 'songs-list',
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrls: ['songs-list.component.scss']
})

export class SongsListComponent {
    
  @Input() list: Song[];
    
  @Output() toggle = new EventEmitter<any>();
    
    
  toggleItem(index: number, prop: string) {
      
    const track = this.list[index];
    
    this.toggle.emit({
      track: { ...track, [prop]: !track[prop] }
    });
  }
}

// songs-playlist.component.ts ///////////////////////////////
export class SongsPlaylistComponent implements OnInit, OnDestroy {
    
  onToggle(event) {
    this.songsService.toggle(event);
  }
}

// songs-listened.component.ts ///////////////////////////////
export class SongsListenedComponent implements OnInit, OnDestroy {
    
  onToggle(event) {
    this.songsService.toggle(event);
  }
}

// songs-favourites.component.ts //////////////////////////////
export class SongsFavouritesComponent implements OnInit, OnDestroy {
    
  onToggle(event) {
    this.songsService.toggle(event);
  }
}

// songs.service.ts //////////////////////////////////////////////////
@Injectable()
export class SongsService {
    
 getPlaylist$: Observable<Song[]> = this.httpClient.get('/api/playlist').pipe(
  map(res => res.json()),
  tap(next => this.store.set('playlist', next))
 );

 toggle(event: any) {
  
  this.httpClient.put(`/api/playlist/${event.track.id}`, event.track).pipe(
    map(res => res.json())
  ).subscribe((track: Song) => {
     
    const value = this.store.value.playlist;
      
    const playlist = value.map((song: Song) => {
      
      if(event.track.id === song.id) {
         return { ...song, ...event.track };
      } else {
         return song;
      }
    });
      
    this.store.set('playlist', playlist);
  });
 }
    
}


<!-- songs-list.component.ts -->
<div>
  <ul>
   <li *ngFor="let item of list; index as i;">
     <p>{{ item.artist }}</p>
     <span>{{ item.track }}</span>
     <div class="songs-list__favourite"
          (click)="toggleItem(i, 'favourite')"
          [class.active]="item.favourite">
     </div>
     <div class="songs-list__listened"
          (click)="toggleItem(i, 'listened')"
          [class.active]="item.listened">
     </div>
   </li>
  </ul>
</div>

<!-- songs-playlist.component.ts -->
<div class="songs">
  <songs-list [list]="playlist$ | async"
              (toggle)="onToggle($event)"
  >Playlist</songs-list>
</div>

<!-- songs-listened.component.ts -->
<div class="songs">
	<songs-list [list]="listened$ | async"
              (toggle)="onToggle($event)"
  >Listened</songs-list>
</div>

<!-- songs-favourites.component.ts -->
<div class="songs">
	<songs-list [list]="favourites$ | async"
              (toggle)="onToggle($event)"
  >Favourites</songs-list>
</div>
