using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string color, int?[] gridArray)
        {
            await Clients.All.SendAsync("ReceiveMessage", color, gridArray);
        }
    }
}