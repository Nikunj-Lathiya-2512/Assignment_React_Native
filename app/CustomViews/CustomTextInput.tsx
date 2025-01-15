import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";

type CustomTextInputProps = {
  control: any;
  name: string;
  placeholder: string;
  rules: object;
  errors: any;
  styles: any;
  language: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  control,
  name,
  placeholder,
  rules,
  errors,
  styles,
  language,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={placeholder}
            style={[
              styles.input,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            error={!!errors[name]}
          />
        )}
      />
      {errors[name] && (
        <Text
          style={[
            styles.error,
            { textAlign: language === "en" ? "left" : "right" },
          ]}
        >
          {errors[name]?.message}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;
