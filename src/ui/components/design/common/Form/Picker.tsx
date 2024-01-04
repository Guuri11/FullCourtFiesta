import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@rneui/themed";

type CustomPickerProps = {
    items: any[];
    selectedValue: string;
    onValueChange: (v: string) => void;
    label: string;
};

const CustomPicker = ({ items, selectedValue, onValueChange, label }: CustomPickerProps) => {
    const { theme } = useTheme();
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            placeholder={label}
            style={{ marginBottom: 10 }}
        >
            {items.map((item) => (
                <Picker.Item
                    style={{ color: theme.colors.grey3, fontSize: 18 }}
                    key={item.value}
                    label={item.label}
                    value={item.value}
                />
            ))}
        </Picker>
    );
};

export default CustomPicker;
