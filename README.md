# supertset-plugin-custom-application-status

This is the Supertset Plugin Custom Application Status Superset Chart Plugin.

### Usage

To build the plugin, run the following commands:

```
npm ci
npm run build
```

Alternatively, to run the plugin in development mode (=rebuilding whenever changes are made), start the dev server with the following command:

```
npm run dev
```

To add the package to Superset, go to the `superset-frontend` subdirectory in your Superset source folder (assuming both the `supertset-plugin-custom-application-status` plugin and `superset` repos are in the same root directory) and run
```
npm i -S ../../supertset-plugin-custom-application-status
```

After this edit the `superset-frontend/src/visualizations/presets/MainPreset.js` and make the following changes:

```js
import { SupertsetPluginCustomApplicationStatus } from 'supertset-plugin-custom-application-status';
```

to import the plugin and later add the following to the array that's passed to the `plugins` property:
```js
new SupertsetPluginCustomApplicationStatus().configure({ key: 'supertset-plugin-custom-application-status' }),
```

After that the plugin should show up when you run Superset, e.g. the development server:

```
npm run dev-server
```
