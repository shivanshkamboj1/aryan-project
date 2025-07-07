// Create RTCPeerConnection immediately
const peer = new RTCPeerConnection({
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:global.stun.twilio.com:3478",
      ],
    },
  ],
});

// Exported functions
async function getOffer() {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(new RTCSessionDescription(offer));
  return offer;
}
export async function getAnswer(offer) {
  await peer.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  return answer;
}

export async function setAnswer(answer) {
  await peer.setRemoteDescription(new RTCSessionDescription(answer));
}
export default {
  peer,getOffer,getAnswer,setAnswer
}
