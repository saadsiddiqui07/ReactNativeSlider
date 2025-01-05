import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  clamp,
  SharedValue,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(TextInput);
const { width } = Dimensions.get("window");

const _spacing = 12;
const _height = 40;
const _width = 1;
const _itemSize = _spacing + _width;

const AnimatedInputText = ({
  value,
  style,
}: {
  value: SharedValue<number>;
  style?: TextStyle;
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      value: String(Math.floor(value.value)),
    };
  });
  return (
    <AnimatedText
      animatedProps={animatedProps}
      underlineColorAndroid={"transparent"}
      editable={false}
      defaultValue={String(value.value)}
      style={[{ fontSize: 24, fontWeight: "600", textAlign: "center" }, style]}
    />
  );
};

const Item = ({ index }: { index: number }) => {
  return (
    <View
      style={{
        width: 1,
        height: _height,
        backgroundColor: "black",
      }}
    />
  );
};

const SliderScreen = () => {
  const data = [...Array(80).keys()];
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = clamp(e.contentOffset.x / _itemSize, 0, data.length - 1);
      console.log(scrollX.value);
    },
    onMomentumEnd: () => {
      console.log("Momentum ended");
    },
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          gap: _spacing * 3,
        }}
      >
        <AntDesign name="caretdown" color={"royalblue"} size={20} />
        <View
          style={{
            height: _height + 10,
            width: _width,
            backgroundColor: "royalblue",
          }}
        />
      </View>
      <AnimatedInputText value={scrollX} />
      <Animated.FlatList
        data={data}
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(index) => String(index)}
        snapToInterval={_itemSize}
        contentContainerStyle={{
          gap: _spacing,
          alignItems: "center",
          paddingHorizontal: width / 2 - _width / 2,
        }}
        renderItem={({ item, index }) => <Item index={index} />}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({});
