import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { ThunkDispatch } from 'redux-thunk';
import * as Actions from './store/actions';
import { AppState } from 'store';
import cn from 'classnames';
import { Game } from './game/Game';
import levels from 'config/levels';
import './Platformer.scss'

interface PlatformerProps { }
type Props = PlatformerProps & LinkStateProp & LinkDispatchprop & RouteComponentProps;

class Platformer extends React.Component<Props, any> {
  private wrap = React.createRef<HTMLDivElement>();
  private game = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const {
      setSizes,
    } = this.props;
    new Game (levels,this.game.current).runGame();
    setSizes( { width: 50, height: 30 } );
  }

  render() {
    return (
      <div ref={this.wrap} className={cn( "g-platformer" )}>
          <div  ref={this.game} id="game"></div>
      </div>
    )
  }
}

interface LinkDispatchprop {
  setSizes: ( sizes: { width?: number, height?: number } ) => void;
}
function mdtp( dispatch: ThunkDispatch<any, any, Actions.PlatformerActionsType>, ownProps: Props ): LinkDispatchprop {
  return bindActionCreators( {
    setSizes: Actions.setSizes,
  }, dispatch );
}

interface LinkStateProp {
  platformer: any,
  scale: number,
}
function mstp( state: AppState, ownProps: Props ): LinkStateProp {
  return {
    platformer: state.platformer,
    scale: state.init.scale,
  }
}

export default withRouter( connect( mstp, mdtp )( Platformer ) ) as any;
