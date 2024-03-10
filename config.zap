opt typescript = true
opt casing = "camelCase"
opt write_checks = true
opt server_output = "./src/server/network.luau"
opt client_output = "./src/client/network.luau"
opt yield_type = "promise"
opt async_lib = "require(game:GetService('ReplicatedStorage').RuntimeLib)"

event ConfirmLoaded = {
    from: Client,
    type: Reliable,
    call: ManyAsync

}

event Replication = {
    from: Server,
    type: Reliable,
    call: ManyAsync,
    data: unknown
}