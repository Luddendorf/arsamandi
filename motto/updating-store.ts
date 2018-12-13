
// songs-playlist.component.ts ////////////
@Component({
    selector: 'songs-playlist',
    templateUrl: './songs-playlist.html'
})

constructor(private store: Store,
            private songsService: SongsService) {}

ngOnInit() {
    this.playlist$ = this.store.select('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
}

onToggle(event) {
  this.songsService.toggle(event);
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

// songs-listened.component.ts ////////////////////////
import { filter, map } from 'rxjs/operators';

export class SongsListenedComponent implements OnInit {
    
  listened$: Observable<any[]>;
    
  constructor(private store: Store,
              private songsService: SongsService) {}
    
  ngOnInit() {
    this.listened$ = this.store.select('playlist').pipe(
      filter(Boolean),
      map(playlist => playlist.filter(track => track.listened))
    );
  }
    
  onToggle(event) {
      this.songsService.toggle(event);
  }
    
}

// songs-favourites.component.ts //////////////////////
import { map, filter } from 'rxjs/operators';
import { SongsService } from '../../services/songs.service';

import { Store } from '../../../store';

export class SongsFavouritesComponent implements OnInit {
    
  favourites$: Observable<any[]>;
    
  constructor(private store: Store,
              private songsService: SongsService) {}
    
  ngOnInit() {
    this.favourites$ = this.store.select('playlist').pipe(
     filter(Boolean),
     map(playlist => playlist.filter(track => track.favourite));
    );
  }
    
  onToggle(event) {
    this.songsService.toggle(event);
  }
}



// db.json /////////////////////////
{
 "playlist": [
   {
  "id": 2,
  "artist": "Pink Floyd",
  "track": "With You",
  "listened": true,
  "favourite": false
  }   
 ]
}


// songs-list.component.ts ///////////////////////////////////
import { Component, Input, Output, EventEmitter,
       ChangeDetectionStrategy } from '@angular/core';

import { Song } from '../../services/songs.service';

@Component({
    selector: 'songs-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['songs-list.component.scss'],
    templateUrl: ``
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



// songs.module.ts ////////////////////////
declarations: [
    SongsListComponent
]



// songs-list.component.scss ///////////////////////////////////
.songs-list {
    background: #fff;
    box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    
    h3 {
     background: #552075;
     color: #fff;
     padding: 10px;
     text-align: center;
    }
    &__favourite {
      width: 22px;
      height: 20px;
      position: absolute;
      top: 27px;
      right: 20px;
      background: url(/img/favourite.svg) no-repeat 0 0;
      background-size: 20px 20px;
      cursor: pointer;
    }
}

// songs.service.ts //////////////////

export interface Song {
  id: number,
  name: string,
  listened: boolean,
  favourite: boolean
}

@Injectable()
export class SongsService {
    
  getPlaylist$: Observable<Song[]> = this.httpClient.get('/api/playlist').pipe(
   map(res => res.json()),
   tap(next => this.store.set('playlist', next))
  );
    
  constructor(private httpClient: HttpClient,
              private store: Store) {}
    
  toggle(event: any) {
    this.httpClient.put(`/api/playlist/${event.track.id}`, event.track).pipe(
     map(res => res.json()).subscribe((track: Song) => {
        
       const value = this.store.value.playlist;
         
       const playlist = value.map((song: Song) => {
         if(event.track.id === song.id) {
           return { ...song, ...event.track }; }else {
              
             return songs;
           };
         });
         
       this.store.set('playlist', playlist);
     });
        
    );
  }
    

}


<!-- songs-playlist.component.ts -->
<div class="songs">
  <songs-list
    [list]="playlist$ | async"
    (toggle)="onToggle($event)"
  >Playlist</songs-list>
</div>

 <!-- <div *ngFor="let item of playlist$ | async">
	{{ item.artist }} {{ item.track }}
</div>  -->

<!-- songs-listened.component.ts -->
<div class="songs">
 <songs-list
   [list]="listened$ | async"
   (toggle)="onToggle($event)"
 >Played</songs-list>
</div>

<!-- songs-favourites.component.ts -->
<div class="songs">
	<songs-list
   [list]="favourites$ | async"
   (toggle)="onToggle($event)"
  >Favourites</songs-list>
</div>

<!-- songs-list.component.html -->
<div class="songs-list">
  <h3>
    <ng-content></ng-content>
  </h3>
  <ul>
    <li *ngFor="let item of list; index as i;">
      <p>{{ item.artist }}</p>
      <span>{{ item.track }}</span>
      <div class="songs-list__favourites"
           (click)="toggleItem(i, 'favourite')"
           [class.active]="item.favourite"></div>
        
      <div class="songs-list__listened"
           (click)="toggleItem(i, 'listened')"
           [class.active]="item.listened"></div>
    </li>
  </ul>
</div>
