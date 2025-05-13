import 'react-native-gesture-handler';
import React, {useState, useRef} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {data, fDAta} from '@utils/constant';
import Card from '@components/Card';
import LottieView from 'lottie-react-native';
import CircularRotation from '@assets/circlesRotate.json';
import RNText from '@components/RNText';

const REFRESH_AREA_HEIGHT = 140;
const SPRING_CONFIG = {damping: 20, stiffness: 300};

interface Recipe {
  id: number | string;
  // Add more fields if needed, e.g. name, image, etc.
}

export default function FavoriteScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>(data || []);
  const pressed = useSharedValue(false);
  const translateY = useSharedValue(0);
  const lottieProgress = useSharedValue(0);
  const [toggleGesture, setToggleGesture] = useState(true);
  const flatlistRef = useAnimatedRef<FlatList<Recipe>>();
  const lottieRef = useRef<LottieView>(null);

  const fetchData = () => {
    lottieProgress.value = 1;

    setTimeout(() => {
      runOnJS(setRecipes)([fDAta, ...recipes].filter(Boolean));
    }, 2000);

    setTimeout(() => {
      translateY.value = withSpring(0, SPRING_CONFIG, () => {
        lottieProgress.value = 0;
      });
    }, 3000);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      if (
        event.translationY >= 0 &&
        event.translationY <= REFRESH_AREA_HEIGHT
      ) {
        translateY.value = event.translationY;
      } else if (event.translationY > REFRESH_AREA_HEIGHT) {
        translateY.value = REFRESH_AREA_HEIGHT;
      }
    })
    .onFinalize(() => {
      if (translateY.value >= REFRESH_AREA_HEIGHT) {
        runOnJS(fetchData)();
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const statusBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateY.value,
          [0, REFRESH_AREA_HEIGHT],
          [0, -40],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));
  const lottieAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [REFRESH_AREA_HEIGHT * 0.7, REFRESH_AREA_HEIGHT],
      [0, 1],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          translateY.value,
          [REFRESH_AREA_HEIGHT * 0.7, REFRESH_AREA_HEIGHT],
          [0.5, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const pullDownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          translateY.value,
          [0, REFRESH_AREA_HEIGHT * 0.7],
          [0, 180],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
    opacity: interpolate(
      translateY.value,
      [0, 20, REFRESH_AREA_HEIGHT * 0.7, REFRESH_AREA_HEIGHT],
      [0, 1, 1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const pullDownTextAnimated = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, 40, REFRESH_AREA_HEIGHT * 0.7, REFRESH_AREA_HEIGHT],
      [0, 1, 1, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          translateY.value,
          [0, REFRESH_AREA_HEIGHT * 0.5],
          [0, 5],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.y;
    if (position <= 0) {
      runOnJS(setToggleGesture)(true);
    } else if (position > 0 && toggleGesture) {
      runOnJS(setToggleGesture)(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.View style={[styles.customStatusBar, statusBarStyle]} />
      <View style={styles.loaderArea}>
        <Animated.View
          style={[pullDownAnimatedStyle, {flexDirection: 'column'}]}>
          <Image
            resizeMode="contain"
            style={{height: 25, width: 25}}
            source={require('@assets/down-arrow.png')}
          />
        </Animated.View>

        <Animated.View style={[pullDownTextAnimated]}>
          <RNText
            title="pull down to refresh"
            color="#000"
            size={'sm'}
            weight="bold"
          />
        </Animated.View>
      </View>

      <Animated.View style={[styles.loaderArea, lottieAnimatedStyle]}>
        <LottieView
          ref={lottieRef}
          style={styles.lottieView}
          source={CircularRotation}
          autoPlay={true}
          loop
        />
      </Animated.View>

      <Animated.View style={[styles.contentContainer, animatedStyles]}>
        <View style={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.fallbackText}>No recipes available</Text>
          ) : (
            <FlatList
              data={recipes}
              ref={flatlistRef}
              onScroll={handleOnScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              keyExtractor={(item, index) => `${item?.id || index}`}
              renderItem={({item}) => <Card item={item} />}
            />
          )}
        </View>
      </Animated.View>

      {toggleGesture && (
        <GestureDetector gesture={pan}>
          <Animated.View style={styles.gesture} />
        </GestureDetector>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  contentContainer: {flex: 1},
  scrollContainer: {flex: 1, width: '100%'},
  flatListContent: {paddingBottom: 100, paddingHorizontal: 10},
  loaderArea: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    backgroundColor: 'transparent',
  },
  customStatusBar: {height: 40, backgroundColor: '#E0144C'},
  gesture: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  lottieView: {width: 100, height: 60, backgroundColor: 'transparent'},
  fallbackText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
});
