import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  TextStyle,
  View,
  FlatList,
  TextInput,
  TextInputProps,
} from "react-native";
import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { _height, _itemSize, _spacing, _width } from "@/constants/values";

const AnimatedText = Animated.createAnimatedComponent(TextInput);
const { width, height } = Dimensions.get("window");

const AnimatedInputText = ({
  value,
  style,
}: {
  value: SharedValue<number>;
  style?: TextStyle;
}) => {
  const animatedProps = useAnimatedProps(() => {
    const roundedValue = Math.round(value.value);
    return {
      text: roundedValue.toString(),
    };
  });

  return (
    <AnimatedText
      underlineColorAndroid={"transparent"}
      editable={false}
      defaultValue={"1"}
      value={undefined} // Set to undefined to use animatedProps
      animatedProps={animatedProps as Partial<AnimatedProps<TextInputProps>>}
      style={[{ fontSize: 24, fontWeight: "600", textAlign: "center" }, style]}
    />
  );
};

const Item = ({ index }: { index: number }) => {
  return (
    <View
      style={{
        width: _width,
        height: _height,
        backgroundColor: "lightgray",
      }}
    />
  );
};

const SliderScreen = () => {
  const data = [...Array(80).keys()];
  const rangeValue = useSharedValue(0);

  const handleFlatlistScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const val = Math.round(scrollOffset / _itemSize) + 1;
      rangeValue.value = withTiming(val); // Smoothly animate the value update
    },
    []
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* This styling is temporary not for prod usage */}
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          top: height / 2 - 20,
        }}
      >
        <AntDesign name="caretdown" color={"black"} size={22} />
        <View
          style={{
            width: _width,
            height: _height + 5,
            backgroundColor: "black",
            zIndex: 1,
          }}
        />
      </View>
      <AnimatedInputText value={rangeValue} />
      <View style={{ height: 200 }}>
        <FlatList
          data={data}
          onScroll={handleFlatlistScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          snapToInterval={_itemSize}
          decelerationRate={"normal"}
          contentContainerStyle={{
            gap: _spacing,
            alignItems: "center",
            paddingHorizontal: width / 2 - _width / 2,
          }}
          renderItem={({ item, index }) => <Item index={index} />}
          scrollEventThrottle={16}
        />
      </View>
    </SafeAreaView>
  );
};

export default SliderScreen;
