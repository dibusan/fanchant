class ChantController < ApplicationController
  def index
    render json: Chant.all
  end

  def show
    render json: Chant.find(params[:id])
  end

  def create
    render json: Chant.create!(create_chant_params)
  end

  private

  def create_chant_params
    params.permit(:title, :content)
  end
end
