import { MutableRefObject, useRef, useState } from "react";
import { offerConnection } from "@/api/virtual-assistant";

type RTCPeerConnectionType = RTCPeerConnection | null;
type RTCDataChannelType = RTCDataChannel | null;

const createWebRTCConnection = (): RTCPeerConnection => {
  const config: RTCConfiguration = {
    iceServers: [
      {
        urls: [process.env.ICE_SERVER_URL || ""],
        username: process.env.ICE_SERVER_USERNAME,
        credential: process.env.ICE_SERVER_CREDENTIAL,
      },
    ],
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require",
  };
  const pc = new RTCPeerConnection(config);
  return pc;
};

const useVỉrtualAssistant = () => {
  const myAvatarVideoEleRef = useRef<HTMLVideoElement>(null);
  const pc: MutableRefObject<RTCPeerConnectionType> = useRef(null);
  const dc: MutableRefObject<RTCDataChannelType> = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pcId, setPcId] = useState<string | null>(null);
  const [messageReceived, setMessageReceived] = useState<string>("");

  const startSession = async () => {
    setIsLoading(true);
    pc.current = createWebRTCConnection();

    pc.current.ontrack = handleOnTrack;
    pc.current?.addTransceiver("audio", { direction: "sendrecv" });
    let transceiver = pc.current?.addTransceiver("video", {
      direction: "sendrecv",
    });

    const codecPreferencePayload = {
      clockRate: 90000,
      mimeType: "video/H264",
      sdpFmtpLine:
        "level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
    };
    const { mimeType, sdpFmtpLine } = codecPreferencePayload;
    const { codecs } = RTCRtpReceiver.getCapabilities("video")!;
    const selectedCodecIndex = codecs.findIndex(
      (c) => c.mimeType === mimeType && c.sdpFmtpLine === sdpFmtpLine
    );
    if (selectedCodecIndex !== -1) {
      const selectedCodec = codecs[selectedCodecIndex];
      codecs.splice(selectedCodecIndex, 1);
      codecs.unshift(selectedCodec);
      transceiver!.setCodecPreferences(codecs);
    }

    dc.current = pc.current?.createDataChannel("chat");

    dc.current.addEventListener("open", () => {
      setIsLoading(false);
      setIsOpen(true);
    });
    dc.current.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.status === "Start") {
        setMessageReceived(data.text_answer);
      }
    });
    dc.current.addEventListener("close", () => {
      setIsLoading(false);
      setIsOpen(false);
      setPcId(null);
    });
    await negotiate();
  };

  const negotiate = async () => {
    try {
      const offer = await pc.current!.createOffer();
      await pc.current!.setLocalDescription(offer);

      await new Promise<void>((resolve) => {
        if (pc.current!.iceGatheringState === "complete") {
          resolve();
        } else {
          function checkState() {
            if (pc.current!.iceGatheringState === "complete") {
              pc.current!.removeEventListener(
                "icegatheringstatechange",
                checkState
              );
              resolve();
            }
          }
          pc.current!.addEventListener("icegatheringstatechange", checkState);
        }
      });

      const localDescription = pc.current!.localDescription;
      if (!localDescription) return;

      const response = await offerConnection({
        sdp: localDescription.sdp!,
        type: localDescription.type,
        video_transforms: "",
      });

      const answer = await response.json();
      setPcId(answer.pc_id);
      await pc.current!.setRemoteDescription(answer);
    } catch (e: any) {
      console.error("Error when connect with streaming server: ", e);
    }
  };

  const handleOnTrack = (event: RTCTrackEvent) => {
    const mediaPlayer = myAvatarVideoEleRef.current;

    if (event.track.kind === "video" && mediaPlayer) {
      mediaPlayer.id = event.track.kind;
      mediaPlayer.srcObject = event.streams[0];
      mediaPlayer.autoplay = true;
      mediaPlayer.playsInline = true;
    }
  };
  const sendMessage = (message: MessagePayload) => {
    dc.current?.send(JSON.stringify(message));
  };
  const stopSession = () => {
    try {
      if (dc.current) {
        dc.current.close();
        dc.current = null;
      }

      if (pc.current?.getTransceivers) {
        pc.current.getTransceivers().forEach((transceiver) => {
          if (transceiver.stop) {
            transceiver.stop();
          }
        });
      }
      pc.current?.close();
      pc.current = null;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    startSession,
    stopSession,
    isLoading,
    myAvatarVideoEleRef,
    sendMessage,
    pcId,
    isOpen,
    messageReceived,
  };
};

export default useVỉrtualAssistant;
