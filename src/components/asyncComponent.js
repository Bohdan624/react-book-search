// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import type { BehaviorSubject } from 'rxjs';
import type { State as StoreState } from '../redux/store';
import type { HomeRouteModule } from '../routes/home/types';
import type { DetailRouteModule } from '../routes/bookDetail/types';
import type { ModuleInfo } from '../redux/append-reducer';

type State = {
  component: ?ComponentType<*>
};

type RouteModule = HomeRouteModule | DetailRouteModule;

// @see: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/code-splitting-in-create-react-app/src/components/AsyncComponent.js
export default function asyncComponent(
  appendAsyncReducer?: (newModuleInfo: ModuleInfo) => void,
  epicSubject$?: BehaviorSubject<any>,
  importComponent: () => RouteModule | Promise<RouteModule>,
  loadedChunkNames: ?(string[]),
  chunkName: $Keys<StoreState>
) {
  class AsyncComponent extends Component<any, State> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null
      };

      if (process.env.SERVER) {
        if (loadedChunkNames) loadedChunkNames.push(chunkName);

        const mod = importComponent();
        if (mod instanceof Promise) throw Error('Promise not expected!');

        this.constructor.setupModuleState(mod);
        this.state = {
          component: mod.default
        };
      }
    }

    static setupModuleState(mod: RouteModule) {
      console.log('Appending reducer for:', chunkName);
      if (appendAsyncReducer)
        appendAsyncReducer({
          name: chunkName,
          reducer: mod.reducer
        });

      console.log('Appending epic for:', chunkName);

      if (epicSubject$) epicSubject$.next(mod.epic);
    }

    async componentDidMount() {
      const modulePromise = importComponent();

      const mod = await modulePromise;
      this.constructor.setupModuleState(mod);

      this.setState({
        component: mod.default
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <div>Loading...</div>;
    }
  }

  return AsyncComponent;
}
