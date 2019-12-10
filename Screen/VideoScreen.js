import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import VideoList from './Videos/VideoList'
import Video from './Videos/Video'

const VideoNavigator = createStackNavigator({
  VideoList: VideoList,
  Video: Video
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
        header: null,
        headerMode: 'none'
    }
});

export default createAppContainer(VideoNavigator);