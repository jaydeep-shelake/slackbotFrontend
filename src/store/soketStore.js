import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { useLeavesStore } from "./leavesStore";
import { useRequestStore } from "./requestStore";
export const useSoketStore = defineStore("soketStore", {
  state() {
    return {
      socket: null,
    };
  },
  actions: {
    setupSocketConnection() {
      const leaveStore = useLeavesStore();
      const requestStore = useRequestStore();
      console.log("entered socket");

      this.socket = io("https://superleaves.onrender.com", {
        auth: {
          token: JSON.parse(localStorage.getItem("slackUser")).token,
          slackId: JSON.parse(localStorage.getItem("slackUser")).user.id,
        },
      });

      this.socket.on("changeData", (data) => {
        leaveStore.allLeaves = data;
      });
      this.socket.on("changeApproverData", (data) => {
        requestStore.allRequest = data;
        requestStore.notiCount = data.length;
      });
    },
    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  },
});
