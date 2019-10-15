import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  // @Input() configuration: Configuration;
  @Input() configurazione?: ConfigurazioneBottone;
  @Input() configurazioneClasse?: ConfigClasse;
  loading: any;
  constructor(private router: Router) { }
  // @Input()action: any;
// }
// export class Configuration {
//   text: string;
//   height: string;
//   width: string;
//   image: string;
//   constructor(text, height, width, image) {
//     this.text = text;
//     this.height = height;
//     this.width = width;
//     this.image = image;
//  }
//   onCustomAction(action: string) {
//     switch (this.configurazione.action) {
//       case 'RouterLink':
//         this.router.navigateByUrl(this.configurazione.url + this.configurazione.id);
//         break;
//        case 'Get':
//          this.router.navigateByUrl('HomeAdmin');
//          break;
//        case 'Post':
//          this.router.navigateByUrl('HomeAdmin');
//          break;
//        case 'Delete':
//          this.router.navigateByUrl('HomeAdmin');
//          break;
//       default:  this.router.navigateByUrl('HomeAdmin');
//     }
//   }

  }

