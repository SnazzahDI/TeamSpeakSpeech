const React = require('react')
const e = React.createElement
const { SettingsMultiSection, SettingsOptionSlider, SettingsSubTitle, SettingsOptionTextbox, SettingsOptionToggle } = require('elements')

module.exports = class SettingsPage extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return e(
      'div',
      {},
      e(
        SettingsOptionToggle,
        {
          lsNode: 'enabled',
          title: 'Enable TeamSpeak-esque Notifications',
          plugin: this.props.plugin,
          defaultValue: true,
          onSave: e => this.props.plugin[e ? 'preload' : 'unload']
        }
      ),
      e(
        SettingsMultiSection,
        {
          sections: [
            [
              e(SettingsSubTitle, { text: 'Volume' }),
              e(
                SettingsOptionSlider,
                { lsNode: 'volume', plugin: this.props.plugin, defaultValue: 100, bubble: true }
              )
            ],
            [
              e(SettingsSubTitle, { text: 'Speech Rate' }),
              e(
                SettingsOptionSlider,
                {
                  lsNode: 'rate',
                  plugin: this.props.plugin,
                  defaultValue: 50,
                  bubble: true,
                  bubbleText: v => Math.round(v*2)
                }
              )
            ],
            [
              e(SettingsSubTitle, { text: 'Pitch' }),
              e(
                SettingsOptionSlider,
                {
                  lsNode: 'pitch',
                  plugin: this.props.plugin,
                  defaultValue: 50,
                  bubble: true,
                  bubbleText: v => Math.round(v*2)
                }
              )
            ]
          ]
        }
      ),
      e(
        SettingsMultiSection,
        {
          sections: [
            [
              e(SettingsSubTitle, { text: 'Voice Channel Join' }),
              e(
                SettingsOptionTextbox,
                { lsNode: 'join', plugin: this.props.plugin, defaultValue: 'Connected' }
              )
            ],
            [
              e(SettingsSubTitle, { text: 'Voice Channel Leave' }),
              e(
                SettingsOptionTextbox,
                { lsNode: 'leave', plugin: this.props.plugin, defaultValue: 'Disconnected' }
              )
            ],
            [
              e(SettingsSubTitle, { text: 'Voice Channel Switch' }),
              e(
                SettingsOptionTextbox,
                { lsNode: 'switch', plugin: this.props.plugin, defaultValue: 'Channel Switched' }
              )
            ]
          ]
        }
      ),
      e(
        SettingsMultiSection,
        {
          sections: [
            [
              e(SettingsSubTitle, { text: 'User Join' }),
              e(
                SettingsOptionTextbox,
                { lsNode: 'userjoin', plugin: this.props.plugin, defaultValue: 'User Joined Your Channel' }
              )
            ],
            [
              e(SettingsSubTitle, { text: 'User Leave' }),
              e(
                SettingsOptionTextbox,
                { lsNode: 'userleave', plugin: this.props.plugin, defaultValue: 'User Left Your Channel' }
              )
            ]
          ]
        }
      )
    )
  }
}
