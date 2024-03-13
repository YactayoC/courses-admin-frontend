/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossOrigin="anonymous"
          ></script>

          <script src="https://adminlte.io/themes/v3/plugins/jquery/jquery.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/jquery-ui/jquery-ui.min.js"></script>

          {/* <script>$.widget.bridge('uibutton', $.ui.button)</script> */}

          <script src="https://adminlte.io/themes/v3/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/chart.js/Chart.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/sparklines/sparkline.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/jqvmap/jquery.vmap.min.js"></script>
          <script src="https://adminlte.io/themes/v3/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/jquery-knob/jquery.knob.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/moment/moment.min.js"></script>
          <script src="https://adminlte.io/themes/v3/plugins/daterangepicker/daterangepicker.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/summernote/summernote-bs4.min.js"></script>

          <script src="https://adminlte.io/themes/v3/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>

          <script src="https://adminlte.io/themes/v3/dist/js/adminlte.js?v=3.2.0"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
