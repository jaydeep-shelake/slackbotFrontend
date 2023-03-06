import { defineStore } from "pinia";

import axios from "axios";
import api from "@/api/api";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      user: localStorage.getItem("slackUser")
        ? JSON.parse(localStorage.getItem("slackUser"))
        : null,
      team: null,
      teamLeaves: [],
      approver: "",
      approverId: "",
      members: [],
      leaveCount:[]
    };
  },
  getters: {
    userName() {
      return this?.user?.user?.name;
    },
    userDetails() {
      return {
        avatar: this.user?.user?.image_192,
        email: this.user?.user?.email,
        slackId: this.user?.user?.id,
        name: this.user?.user?.name,
      };
    },
    loggedIn() {
      return this.user ? true : false;
    },

    teamDetails() {
      return { teamId: this.user?.team?.id };
    },
    getTeamLeaves() {
      return this.teamLeaves;
    },
  },

  actions: {
    async fetchUser(code) {
      // login /signin of user
      if (this.user === null) {
        const { data } = await axios.post(
          "https://superleaves.onrender.com/auth/callback",
          { code: code }
        );
        const identity = data?.identity;
        this.user = {
          team: identity.team,
          user: identity.user,
          tokem: data.token,
          ...data.user,
        };
        localStorage.setItem(
          "slackUser",
          JSON.stringify({
            team: identity.team,
            user: identity.user,
            token: data.token,
            ...data.user,
          })
        );
        console.log("localstorage is set");
        this.router.push("/");
      }
    },
    async fetchUserTeam() {
      const { data } = await api.get(
        `/team?slackId=${this.userDetails.slackId}`
      );
      this.team = data.name;
      this.approver = data.approvers[0].name;
      this.fetchTeamLeaves();
      this.members = data.members;
      this.approverId = data.approvers[0].userId;
    },

    async fetchTeamLeaves() {
      console.log("entered in team leaves");
      const { data } = await api.get(`/leaves?team=${this.team}`); // dynamic value for team
      this.teamLeaves = data;
    },
    async getUsersLeaveCount(){
      const {data} = await api.get(`/users/user/${this.user.userId}`)
      this.leaveCount=data
    },
    logout() {
      localStorage.removeItem("slackUser");
      this.user = null;
      this.router.push("/login");
    },
  },
});
