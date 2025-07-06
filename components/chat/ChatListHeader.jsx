import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import AddNewChat from "./AddNewChat";
import { fetchSearchResultFromApi } from "@/lib/api";

function ChatListHeader() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const fetchSearch = async (query) => {
    if (query.length > 2) {
      const response = await fetchSearchResultFromApi({ query: query });
      setSearchResults(response);
      console.log(response);
    }
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSearch(query);
    }, 300);
  };
  return (
    <>
      <div className="flex flex-row justify-between p-3">
        <p className="text-2xl">Chats</p>

        <AddNewChat />
      </div>
      <div className="p-2 ">
        <Input value={query} onChange={handleInputChange} />
      </div>
    </>
  );
}

export default ChatListHeader;
