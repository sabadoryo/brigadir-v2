export interface DiscordMeResponseDto {
  application: {
    id: string
    name: string
    icon: string
    description: string
    hook: boolean
    bot_public: boolean
    bot_require_code_grant: boolean
    verify_key: string
  }
  scopes: string[]
  expires: Date
  user: DiscordUser
}

export interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
  global_name: string
  public_flags: number
}
