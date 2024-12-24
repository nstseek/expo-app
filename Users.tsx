import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

type User = {
  id: number;
  name: string;
};

const getUsers = async () => {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const Users = () => {
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetUsers();

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Type your search here"
        value={search}
        onChangeText={setSearch}
      />
      {!!data && !!search && (
        <View>
          {data
            .filter((user) => user.name.includes(search))
            .map((user) => (
              <Text>{user.name}</Text>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
