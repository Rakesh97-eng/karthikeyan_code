import { Helmet } from 'react-helmet';
import RootProvider from './providers';
import { Router } from './router';
import './scss/global.scss';

function App() {
  return (
    <>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML: `!(function (e, o) {
          try {
            window._solve ||
              ((window._solve = e),
              (document.head.appendChild(document.createElement('script')).src =
                o)),
              window.solve ||
                (window.solve = {
                  ready: [].push.bind((window._solve.ready = [])),
                })
          } catch (e) {
            console.error(e)
          }
        })(
          {
            apiKey: '${process.env.REACT_APP_SOLVE_API_KEY}',
            apiUrl: '${process.env.REACT_APP_SOLVE_API_URL}',
          },
          '${process.env.REACT_APP_SOLVE_SDK}'
        )`,
          },
        ]}
      />
      <RootProvider>
        <Router />
      </RootProvider>
    </>
  );
}

export default App;
