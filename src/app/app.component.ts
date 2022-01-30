import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var createUnityInstance: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router
  ) {

  }

  async ngOnInit() {

    var buildUrl = "assets/WebGL3/Build";
    var config = {
      dataUrl: buildUrl + "/WebGL3.data",
      frameworkUrl: buildUrl + "/WebGL3.framework.js",
      codeUrl: buildUrl + "/WebGL3.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "ihpSoft",
      productName: "Runner",
      productVersion: "0.1",
      devicePixelRatio: 0
    };

    let container = document.querySelector("#unity-container") || new Element();
    var canvas: HTMLElement = document.querySelector("#unity-canvas") || new HTMLElement();
    var loadingBar: HTMLElement = document.querySelector("#unity-loading-bar") || new HTMLElement();
    var progressBarFull: HTMLElement = document.querySelector("#unity-progress-bar-full") || new HTMLElement();
    var fullscreenButton: HTMLElement = document.querySelector("#unity-fullscreen-button") || new HTMLElement();
    // var mobileWarning : HTMLElement = document.querySelector("#unity-mobile-warning") || new HTMLElement();

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
      // mobileWarning.style.display = "block";
      setTimeout(() => {
        // mobileWarning.style.display = "none";
      }, 5000);
    } else {
      // canvas.style.width = "640px";
      // canvas.style.height = "360px";
      canvas.style.width = "100%";
      canvas.style.height = "90%";
    }
    loadingBar.style.display = "block";

    createUnityInstance(canvas, config, (progress: any) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance: any) => {
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message: any) => {
      alert(message);
    });

  }
}