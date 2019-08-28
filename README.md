# React Avatar Generator
This was inspired by an old website called LayerVault. You can see an example of how that used to look like [here](https://dribbble.com/shots/691265-Kaleidoscope-In-Production).

## Getting Started
- `yarn add react-avatar-generator` or `npm i react-avatar-generator`
- `import AvatarGenerator from 'react-avatar-generator';`

## Example Usage
```
<AvatarGenerator
  colors={['#333', '#222', '#ccc']}
  backgroundColor="#000"
/>
```

This creates something like this:

<img src="https://i.ibb.co/vDg9Trb/Screenshot-2019-01-10-at-04-34-51.png" width="100" />

With a little playing around with this component I found it quite easy to make something similar to what LayerVault originally had.

<img src="https://i.ibb.co/0XmmV0s/Screen-Recording-2019-01-10-at-04-33-23.gif" width="500" />

## Props
| prop        | type            | default                   | options                   |
| ------------ | --------------- | ---------------------- | ---------------------- |
| width          | number           | 200              |              |
| height        | number      | 200        |              |
| mirrors       | number     | 3             |              |
| zoom | number | 0.2 |              |
| rotation       | number     | 0.3             |              |
| fade       | number     | 1             |              |
| opacity       | number     | 0.3             |              |
| amount       | number     | 16             |              |
| spacing       | number     | 20             |              |
| wavelength       | number     | 2             |              |
| sizing       | number     | 4             |              |
| shape       | string     | 'circle'             | can be `circle`, `triangle` or `square`          |
| backgroundColor       | string     | '#fff'             |              |
| backgroundOpacity       | number     | 0.3             |              |
| colors       | array     | []             |              |

## Methods
| prop        | type            | description                   |
| ------------ | --------------- | ---------------------- |
| randomize          | function           | Randomizes the kaleidoscope to have a new random pattern             |
| isValidHex          | function           | Passing in a string will return true of false if that string is a valid hex, a helpful function to have when working with colors             |
| getImageData          | function           | Calling this function returns the raw image/png data you can then use to save into a .png file.             |

## Using Methods

```
class CustomAvatarGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.avatarGenerator = null;
  }
  
  randomize() {
    this.avatarGenerator.randomize();
  }
  
  render() {
    return (
      <div>
        <button onClick={this.randomize}>Randomize</buttom>
        <AvatarGenerator
          ref={(el) => {
            this.avatarGenerator = el;
          }
          colors={['#333', '#222', '#ccc']}
          backgroundColor="#000"
        />
      </div>
    );
  }
}
```
