import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../operations/apiLogic";
import Navbar from "../common/Navbar";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { apiConnector } from '../../operations/apiconnector';
import { roomEndpoints } from '../../operations/apis';
const { GET_ROOM } = roomEndpoints;

const RoomDash = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isCreate, setIsCreate] = useState(true);

  const handleChange = async() => {
    const room = ref.current?.value.trim();
    if (!room){
      toast.error(isCreate ? "Room Name is required" : "Room ID is requried")
      return;
    }

    if (isCreate) {
      dispatch(createRoom(room, navigate));
    } else {
         try {
            const response = await apiConnector('GET', `${GET_ROOM}/${room}`);
            if (!response.data.success) {
              toast.error("Room does not exist");
              return;
            }
            navigate(`/room/${room}`); // uncomment this when room is valid
          } catch (error) {
            console.error("Error checking room:", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
          }
        }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-white px-4">
        <Card className="w-full max-w-md p-6 shadow-xl border border-zinc-200">
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-zinc-800">
              Room Dashboard
            </h2>
            <div className="flex justify-center gap-2">
              <Button
                variant={isCreate ? "default" : "outline"}
                onClick={() => setIsCreate(true)}
                className={isCreate ? "bg-zinc-800 text-white" : ""}
              >
                Create Room
              </Button>
              <Button
                variant={!isCreate ? "default" : "outline"}
                onClick={() => setIsCreate(false)}
                className={!isCreate ? "bg-zinc-800 text-white" : ""}
              >
                Join Room
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomid" className="text-zinc-600">
                {isCreate ?"Room name" : "Room ID"}
              </Label>
              <Input
                ref={ref}
                id="roomid"
                placeholder={isCreate ?"Study" : "a8b63"}
                className="text-zinc-800 placeholder-zinc-400"
              />
            </div>


            <Button onClick={handleChange} className="w-full bg-zinc-700 text-white hover:bg-zinc-800">
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RoomDash;
