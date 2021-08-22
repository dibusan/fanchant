class ChantController < ApplicationController
  def index
    render json: Chant.where(version: 2)
  end

  def index2_deprecated
    render json: Chant.where(version: 1)
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
