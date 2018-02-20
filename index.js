const { Plugin } = require('elements')

module.exports = class TeamSpeakSpeech extends Plugin {
  preload() {
    this.DI.client.on('voiceStateUpdate', this.onVoiceUpdate.bind(this))
  }

  async load() {
    this.registerSettingsTab('TeamSpeak Speech', require('./Page'))
  }

  onVoiceUpdate(oldMember,newMember) {
    if(!this.settings.enabled) return
    if(oldMember.user.id === this.DI.client.user.id || newMember.user.id === this.DI.client.user.id){
      if(!oldMember.voiceChannel && newMember.voiceChannel){ // Client joins a new channel
        this.speak(this.settings.join)
        this.currentVC = newMember.voiceChannel.id;
      }else if(oldMember.voiceChannel && !newMember.voiceChannel){ // Client disconnects from channel
        this.speak(this.settings.leave)
        this.currentVC = null
      }else if(oldMember.voiceChannel.id !== newMember.voiceChannel.id){ // Client switches channels
        this.speak(this.settings.switch)
        this.currentVC = newMember.voiceChannel.id;
      }
    }
    if(!this.currentVC) return;
    if(oldMember.user.id !== this.DI.client.user.id && newMember.user.id !== this.DI.client.user.id ){
      if(!oldMember.voiceChannel && newMember.voiceChannel && newMember.voiceChannel.id !== this.currentVC) return;
      if(oldMember.voiceChannel && oldMember.voiceChannel.id !== this.currentVC && !newMember.voiceChannel) return;
      if(!oldMember.voiceChannel && newMember.voiceChannel && newMember.voiceChannel.id === this.currentVC){
        this.speak(this.settings.userjoin)
      }else if(oldMember.voiceChannel && oldMember.voiceChannel.id === this.currentVC && !newMember.voiceChannel){
        this.speak(this.settings.userleave)
      }else if(oldMember.voiceChannel.id !== this.currentVC && newMember.voiceChannel.id === this.currentVC){ // User joined to channel
        this.speak(this.settings.userjoin)
      }else if(oldMember.voiceChannel.id === this.currentVC && newMember.voiceChannel.id !== this.currentVC){ // User joined another channel
        this.speak(this.settings.userleave)
      }
    }
  }

  speak(text) {
    var speech = new SpeechSynthesisUtterance(text);
    
    speech.volume = this.settings.volume/100;
    speech.rate   = this.settings.rate/50;
    speech.pitch  = this.settings.pitch/50;
    speech.voice  = window.speechSynthesis.getVoices()[0];
    
    window.speechSynthesis.speak(speech);
  }

  unload() {
    this.DI.client.removeListener('voiceStateUpdate', this.onVoiceUpdate.bind(this))
  }

  get color() {
    return '425f80';
  }

  get iconURL() {
  	return 'http://icons.iconarchive.com/icons/dakirby309/simply-styled/256/TeamSpeak-icon.png'
  }
}
