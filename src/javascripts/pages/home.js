// --------------------------------------------------------------------
// React and Redux Imports
// --------------------------------------------------------------------

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLinksByApi } from 'javascripts/actions/app';

// -------------------------------------------------------------------------------

@connect((state) => {
  return {
    links: state.app.links,
    fetched: state.app.fetched
  };
})

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch( getLinksByApi() );
  }

  render() {
    return (
      <div className="nx-home">
        { !this.props.fetched &&
          <div className="nx-loading">carregando links...</div>
        }
        { this.props.fetched &&
          <ul className="nx-links gg-u-is-not-list">
            {
              this.props.links.map((item, i) => {
                return (
                  <li className="nx-links__item" key={ i }>
                    <h2 className="nx-links__website">{ item.website }</h2>
                    {
                      item.urls.map((urls, x) => {
                        return (
                          <div className="nx-links__links" key={ x }>
                            <h3 className="nx-links__title">{ urls.text }</h3>
                            <a href={ urls.href } className="nx-links__link" target="_blank">{ urls.href }</a>
                          </div>
                        )
                      })
                    }
                  </li>
                );
              })
            }
          </ul>
        }
      </div>
    )
  }
}

export default Home;
