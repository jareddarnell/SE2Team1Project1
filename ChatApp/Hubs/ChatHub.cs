using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string color, object[] playerGameBoard)
        {
            await Clients.All.SendAsync("ReceiveMessage", color, playerGameBoard);
        }

        public async Task SendMath()
        {
            await Clients.All.SendAsync("ReceiveMath");
        }
    }
}