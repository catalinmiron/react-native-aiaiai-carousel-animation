import React from "react";
import {
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Svg } from "expo";
const { Defs, RadialGradient, Stop, Rect } = Svg;

// s03h03e05c02
const LOGO_URI = `http://www.palaisdetokyo.com/sites/default/files/aiaiai_logo_circle_new_1.png`;
const getImageUri = id => `https://aiaiai.dk/images/front/${id}_m.png`;

const PRODUCT_LIST = [
  {
    id: "s02h02e02c02",
    title: "TMA-2",
    subtitle: "DJ PRESET",
    description:
      "This configuration is based on the original TMA-1 DJ, which is the preferred choice of a range of acclaimed DJs.",
    price: "200€",
    bg: "#16CDC1"
  },
  {
    id: "s74h02e02c74",
    title: "TMA-2",
    subtitle: "ED BANGER EDITION",
    description:
      "This combination provides a very heavy and powerful bass. Recommended for bass lovers and those who like it loud. Limited edition of 300.",
    price: "240€",
    bg: "#bbb"
  },
  {
    id: "s04h71e05c71",
    title: "TMA-2",
    subtitle: "YOUNG GURU PRESET",
    description:
      "This configuration provides open, vibrant sound with good bass and treble. Wide sound stage and medium isolation.",
    price: "260€",
    bg: "palevioletred"
  },
  {
    id: "s03h03e04c02",
    title: "TMA-2",
    subtitle: "STUDIO PRESET",
    description:
      "This configuration provides a warm sound and it is good for extended listening. Great bass and added energy in the lower mid range.",
    price: "225€",
    bg: "#629BF0"
  }
];

export default class App extends React.Component {
  _scrollX = new Animated.Value(0);
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.ScrollView
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this._scrollX } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {PRODUCT_LIST.map((item, i) => this._renderItem(item, i))}
        </Animated.ScrollView>
        <Image source={{ uri: LOGO_URI }} style={styles.logoImage} />
      </View>
    );
  }

  _renderItem = (item, i) => {
    const inputRange = [
      (i - 2) * width,
      (i - 1) * width,
      i * width,
      (i + 1) * width
    ];
    const imageScale = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.4, 1, 0.4]
    });
    const imageOpacity = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.2, 1, 0.2]
    });

    return (
      <View key={item.id} style={[styles.container, styles.item]}>
        <Animated.Image
          source={{ uri: getImageUri(item.id) }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: imageScale
                }
              ],
              opacity: imageOpacity
            }
          ]}
        />
        <Animated.View
          style={[
            styles.metaContainer,
            {
              opacity: imageOpacity
            }
          ]}
        >
          <Text style={[styles.font, styles.title]}>{item.title}</Text>
          <Text style={[styles.font, styles.subtitle]}>{item.subtitle}</Text>
          <Text style={[styles.font, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.font, styles.price]}>{item.price}</Text>
        </Animated.View>
        {this._renderRadialGradient(item.bg, inputRange)}
      </View>
    );
  };

  _renderRadialGradient = (color, inputRange) => {
    const rotate = this._scrollX.interpolate({
      inputRange,
      outputRange: ["0deg", "-15deg", "0deg", "15deg"]
    });
    const translateX = this._scrollX.interpolate({
      inputRange,
      outputRange: [0, width, 0, -width]
    });
    const opacity = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.5, 1, 0.5]
    });

    return (
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [
              {
                rotate
              },
              {
                translateX
              },
              {
                scale: 1.3
              }
            ],
            opacity
          }
        ]}
      >
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="35%"
              r="60%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <Stop offset="100%" stopColor={color} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={`url(#grad)`}
            fillOpacity="0.9"
          />
        </Svg>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    width,
    height,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  scrollViewContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  font: {
    fontFamily: "Menlo",
    color: "#222"
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: "contain"
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    padding: 15
  },
  title: {
    fontSize: 36,
    fontWeight: "900"
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "900"
  },
  description: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: "center"
  },
  price: {
    fontSize: 42,
    fontWeight: "400"
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  },
  logoImage: {
    width: width / 7,
    height: width / 7,
    position: "absolute",
    top: 10,
    resizeMode: "contain"
  }
});
