class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:facebook]
  devise :confirmable
  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid, :name

  def find_or_create_by_facebook_oauth
    user = User.where(:provider => auth.provider, :uid => auth.uid).first

    unless user
       user = User.create!(
       provider: auth.provider,
       uid: auth.uid,
       email: auth.info.email,
       password: Devise.friendly_token[0,20]
      )
    end

    user

  end
end
