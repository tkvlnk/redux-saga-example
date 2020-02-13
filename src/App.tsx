import React from 'react';
import './App.css';
import { Button, Icon, Layout } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import CharactersList from './containers/CharactersList';
import CharactersFilters from './containers/CharactersFilters';
import CharacterDetails from './containers/CharacterDetails';
import AppWrapper from './containers/AppWrapper';
import NetworkIndicator from './containers/NetworkIndicator';

const App: React.FC = () => {
  return (
    <AppWrapper>
      <div className="App">
        <Layout>
          <NetworkIndicator />
          <Switch>
            <Route path="/:characterId">
              <Layout.Header>
                <Link to="/">
                  <Button type="primary">
                    <Icon type="left" />
                    Back to list
                  </Button>
                </Link>
              </Layout.Header>
              <Layout.Content>
                <CharacterDetails />
              </Layout.Content>
            </Route>

            <Route path="/">
              <Layout.Footer>
                <CharactersFilters />
              </Layout.Footer>
              <Layout.Content>
                <CharactersList />
              </Layout.Content>
            </Route>
          </Switch>
        </Layout>
      </div>
    </AppWrapper>
  );
};

export default App;
