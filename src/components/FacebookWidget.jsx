// components/FacebookWidget.jsx
import { useEffect } from "react";

export default function FacebookWidget() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(); // re-render widget if needed
    }
  }, []);

  return (
    <div
      className="fb-page"
      data-href="https://www.facebook.com/profile.php?id=61572512135057&sk=photos" 
      data-tabs="timeline"
      data-width="340"
      data-height="500"
      data-small-header="false"
      data-adapt-container-width="true"
      data-hide-cover="false"
      data-show-facepile="true"
    >
      <blockquote
        cite="https://www.facebook.com/profile.php?id=61572512135057&sk=photos"
        className="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/profile.php?id=61572512135057&sk=photos">
          FileMyRTI
        </a>
      </blockquote>
    </div>
  );
}
