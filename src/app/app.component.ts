import { Component } from '@angular/core';
import { ZoomService } from './services/zoom.service';
import { Store } from '@ngrx/store';
import { MetaState } from 'src/redux/states/meta.state';
import { loginSuccess } from 'src/redux/actions/user.action';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserState } from 'src/redux/states/user.state';
import { User } from 'src/models/user.model';
import { ConfigsState } from 'src/redux/states/configs.state';
import * as ConfigsActions from 'src/redux/actions/configs.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skillmap';

  constructor(
    public zoomService: ZoomService,
    private auth: Auth,
    private store: Store<{ user: UserState; configs: ConfigsState }>
  ) {
    this.store.dispatch(ConfigsActions.fetch());
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        return;
      }
      this.store.dispatch(
        loginSuccess(<User>{
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      );
    });
  }

  sidebarOpen = true;

  zoom(event: number) {
    console.log('zoomChange', event);
    this.zoomService.setZoom(event);
  }
}
