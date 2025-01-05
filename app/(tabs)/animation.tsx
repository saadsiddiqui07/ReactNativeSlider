import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const _spacing = 8;
const _height = 40;
const _width = 1;
const _itemSize = _spacing + _width;

const Item = ({ index }: { index: number }) => {
  return (
    <View style={{ width: 1, height: _height, backgroundColor: "black" }} />
  );
};

const animation = () => {
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
        alignContent: "center",
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
            height: _height,
            width: _width,
            backgroundColor: "royalblue",
          }}
        />
      </View>
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

export default animation;

const styles = StyleSheet.create({});
