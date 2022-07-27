'use babel';

import DemoSlotMahjongView from './demo-slot-mahjong-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotMahjongView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotMahjongView = new DemoSlotMahjongView(state.demoSlotMahjongViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotMahjongView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-mahjong:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotMahjongView.destroy();
  },

  serialize() {
    return {
      demoSlotMahjongViewState: this.demoSlotMahjongView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotMahjong was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
